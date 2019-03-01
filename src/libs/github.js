import axios from 'axios'
import humps from 'humps'
import config from 'config'

const github = {
  getTopRepos ({ lang = 'javascript' }) {
    const path = `${config.githubApiEndpoint}/search/repositories?q=language:${lang}&sort=stars&order=desc`
    return axios.get(path).then((res) => humps.camelizeKeys(res.data))
  }
}

export default github
