# import necessary libraries
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)



# Flask Setup
app = Flask(__name__)


@app.route("/names")
def names():
    # data load from csv file - pandas
    biodiversity_samples = pd.read_csv('data/belly_button_biodiversity_samples.csv', index_col=0)
    names_list=biodiversity_samples.columns.tolist()
    print(f'first sample : {names_list[0]} --- last sample: {names_list[-1]}')
    return jsonify(names_list)

@app.route('/otu')
def otu():
    # data load from csv file - pandas
    biodiversity_otu = pd.read_csv('data/belly_button_biodiversity_otu_id.csv', index_col=0)
    otu_list = biodiversity_otu['lowest_taxonomic_unit_found'].tolist()
    print(f'first girm :  {otu_list[0]}')
    print(f'last girm  :  {otu_list[-1]}')
    return jsonify(otu_list)

@app.route('/metadata/<id>')
def metadata(id):
    # data load from csv file - pandas
    meta_data = pd.read_csv('data/Belly_Button_Biodiversity_Metadata.csv')
    meta_data = meta_data[['AGE', 'BBTYPE', 'ETHNICITY', 'GENDER', 'LOCATION', 'SAMPLEID']]
    meta_data['ID'] = 'BB_' + meta_data['SAMPLEID'].astype(str)
    meta_data = meta_data.set_index('ID').to_dict('index')
    data = meta_data[id]
    mData = []
    for k,v in data.items():
        kv = {'t0':k, 't1':v}
        mData.append(kv)

    return jsonify(mData)

@app.route('/wfreq/<id>')
def wfreq(id):
    # data load from csv file - pandas
    meta_data = pd.read_csv('data/Belly_Button_Biodiversity_Metadata.csv')
    meta_data = meta_data[['WFREQ', 'SAMPLEID']]
    meta_data['ID'] = 'BB_' + meta_data['SAMPLEID'].astype(str)
    meta_data = meta_data.set_index('ID').drop(['SAMPLEID'], axis=1).to_dict('index')
    return jsonify(int(meta_data[id]['WFREQ']))



@app.route('/samples/<id>')
def samples(id):
    # data load from csv file - pandas
    biodiversity_samples = pd.read_csv('data/belly_button_biodiversity_samples.csv')
    biodiversity_samples = biodiversity_samples[['otu_id',id]].sort_values(id, ascending=0)
    biodiversity_samples.columns = ['otu_id', "sample_values"]
    biodiversity_samplesL = biodiversity_samples[biodiversity_samples['sample_values'] > 10]
    small_vals = biodiversity_samples[biodiversity_samples['sample_values'] < 10]['sample_values'].sum()
    smallD = {'otu_id' : 'Other GERMS', 'sample_values' : small_vals}
    biodiversity_samplesS = pd.DataFrame(smallD, index=[0])
    df = pd.concat([biodiversity_samplesL, biodiversity_samplesS])

    return jsonify(df.to_dict('list'))




# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
