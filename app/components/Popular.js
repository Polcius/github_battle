import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';


//Displays a list of languages. Marks the selected language with color, clicking it selects it.
function SelectLanguage({ selectedLanguage, onSelect }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="languages">
      {languages.map((lang) => (
          <li
            style={
              lang === selectedLanguage ? { color: "#d0021b" } : null
            }
            onClick={() => onSelect(lang)}
            key={lang}
          >
            {lang}
          </li>
      ))}
    </ul>
  )
}
//Displays a list of the most popular repositories by language. Gets { repos } as an argument, a repos object fetched from the custom API (../utils/api)
function RepoGrid({ repos }) {
  return (
    <ul className="popular-list">
      {repos.map(({ name, stargazers_count, owner, html_url }, index) => (
        <li key={name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={owner.avatar_url}
                alt={'Avatar for ' + owner.login}
              />
            </li>
            <li><a href={html_url}>{name}</a></li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
    state = {
      //Starts with 'All' so the user sees the functionality upfront
      selectedLanguage: "All",
      repos: null
    }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage = async (lang) => {
    this.setState(() => ({
        selectedLanguage: lang,
        repos: null
    }));
    
    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos }))

  }  

  render() {
    const { selectedLanguage, repos } = this.state

    return (
      <div className="langcontainer">
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={repos} />
        }
      </div>
    );
  }
}

export default Popular;
