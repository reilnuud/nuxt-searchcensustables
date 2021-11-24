import MiniSearch from 'minisearch'
import variables from '../json/variables.json'

const documents = Object.entries(variables.variables).map(([key, value]) => ({
  id: key,
  ...value,
})).filter(c=>c.id !== "GEO_ID")

const minisearch = new MiniSearch({
  fields: ['id','label', 'concept', "group"], // fields to index for full-text search
  storeFields: ['id', 'label', 'concept', "group","attributes"], // fields to return with search results,
  searchOptions: {
    boost: { id:1, label: 2 },
    // fuzzy: 0.2,
    // prefix: true
  }
})

minisearch.addAll(documents)

addEventListener('message', (event) => {
  const {query} = event.data
  postMessage({ key: 'working', value: true })
  if(query?.length > 3) {
    postMessage({
      key: 'results',
      value: minisearch.search(query),
    })
  }
  postMessage({ key: 'working', value: false })
})
