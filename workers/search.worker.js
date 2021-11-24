import MiniSearch from 'minisearch'
import variables from '../json/variables.json'

const documents = Object.entries(variables.variables).map(([key, value]) => ({
  id: key,
  ...value,
}))

const minisearch = new MiniSearch({
  fields: ['label', 'concept'], // fields to index for full-text search
  storeFields: ['id', 'label', 'concept'], // fields to return with search results
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
