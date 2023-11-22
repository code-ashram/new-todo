import logoImg from '../../img/logo.png'

const Search = () => {

  return (
    <nav className="navbar mb-3 bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className={"logo"} src={logoImg} alt="logo" />
        </a>

        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Search
