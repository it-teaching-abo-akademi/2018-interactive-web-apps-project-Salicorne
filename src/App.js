import React from 'react';

class PrimaryButton extends React.Component {
  render() {
      return(<button className="btn btn-primary" type="button" onClick={this.props.clickHandler} disabled={this.props.disabled}>{this.props.text}</button>);
  }
}

class Stock extends React.Component {
  constructor(props) {
      super(props);
      this.select = this.select.bind(this);
  }

  select(e) {
      this.props.selectHandler(this.props.name, e.target.checked);
  }

  render() {
      const cName = (this.props.selected) ? "table-primary" : "";
      return(
          <tr className={cName}>
              <td>{this.props.name}</td>
              <td>{(this.props.value * this.props.rate).toFixed(2)}{this.props.currency}</td>
              <td>{this.props.quantity}</td>
              <td>{(this.props.value * this.props.quantity * this.props.rate).toFixed(2)}{this.props.currency}</td>
              <td className="text-center"><input className="form-check-input" type="checkbox" value="" checked={this.props.selected} onChange={this.select}/></td>
          </tr>
      );
  }
}

class RenamePortfolioModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          name: props.initialName
      };
      // Handlers bindings
      this.handleChange = this.handleChange.bind(this);
      this.rename = this.rename.bind(this);
  }

  handleChange(e) {
      this.setState({
          name: e.target.value
      });
  }

  rename() {
      // Propagate the new name to the portfolio
      this.props.renameHandler(this.state.name);
      // Close the modal
      document.getElementById("modal-rename-close-"+this.props.k).click();
  }

  render() {
      return(
          <div className="modal fade" id={"modal-rename-"+this.props.k} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">Rename portfolio</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                  <div className="form-group">
                      <label htmlFor={"input-rename-"+this.props.k}>New name :</label>
                      <input type="text" className="form-control" id={"input-rename-"+this.props.k} placeholder="Enter here the new name of this portfolio" value={this.state.name} onChange={this.handleChange}></input>
                  </div>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" id={"modal-rename-close-"+this.props.k}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={this.rename}>Save changes</button>
              </div>
              </div>
          </div>
          </div>
      );
  }
}

class AddStockModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          symbol: "", 
          quantity: 1, 
          canAddStock: false
      };
      // Handlers bindings
      this.handleChange = this.handleChange.bind(this);
      this.addStock = this.addStock.bind(this);
  }

  handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value.toUpperCase()
      });
  }

  addStock() {
      // Propagate the creation to the portfolio
      this.props.addStockHandler(this.state.symbol, this.state.quantity);
      // Close the modal
      document.getElementById("modal-addstock-close-"+this.props.k).click();
  }

  render() {
      const canAddStock = this.state.quantity > 0 && this.props.isCorrectSymbolHandler(this.state.symbol);
      return(
          <div className="modal fade" id={"modal-addstock-"+this.props.k} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">Add stock</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                  <form>
                      <div className="form-group">
                          <label htmlFor={"input-addstock-symbol-"+this.props.k}>Symbol :</label>
                          <input type="text" className="form-control" id={"input-addstock-symbol-"+this.props.k} placeholder="Enter here the symbol of the stock" value={this.state.symbol} onChange={this.handleChange} name="symbol" required></input>
                      </div>
                      <div className="form-group">
                          <label htmlFor={"input-addstock-quantity-"+this.props.k}>Quantity :</label>
                          <input type="number" min={1} step={1} className="form-control" id={"input-addstock-quantity-"+this.props.k} placeholder="Enter here the number of shares" value={this.state.quantity} onChange={this.handleChange} name="quantity"></input>
                      </div>
                  </form>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" id={"modal-addstock-close-"+this.props.k}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={this.addStock} disabled={!canAddStock}>Add stock !</button>
              </div>
              </div>
          </div>
          </div>
      );
  }
}



class GraphModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      };
  }

  render() {
      var stocksList = Object.keys(this.props.stocks).map(s => <li key={s} className="list-group-item">{s}</li>);
      return(
          <div className="modal fade" id={"modal-graph-"+this.props.k} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">{this.props.name} performance</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                  <div className="row">
                      <div className="col-lg-3">
                          <ul className="list-group list-group-flush">
                              {stocksList}
                          </ul>
                      </div>
                      <div className="col-lg-9">
                          
                      </div>
                  </div>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" id={"modal-graph-close-"+this.props.k}>Close</button>
              </div>
              </div>
          </div>
          </div>
      );
  }
}

class Portfolio extends React.Component {
  constructor(props) {
      super(props);
      // Handlers bindings
      this.deletePortfolio = this.deletePortfolio.bind(this);
      this.showInEuros = this.showInEuros.bind(this);
      this.showInDollars = this.showInDollars.bind(this);
      this.rename = this.rename.bind(this);
      this.addStock = this.addStock.bind(this);
      this.selectStock = this.selectStock.bind(this);
      this.deleteStocks = this.deleteStocks.bind(this);
  }

  deletePortfolio(e) {
      this.props.deleteHandler(this.props.k);
  }

  showInEuros(e) {
      e.preventDefault(); // Prevent link anchor navigation
      this.props.setCurrencyHandler(this.props.k, '€');
  }

  showInDollars(e) {
      e.preventDefault(); // Prevent link anchor navigation
      this.props.setCurrencyHandler(this.props.k, '$');
  }

  rename(newName) {
      // Propagate the new name to the app
      this.props.renameHandler(this.props.k, newName);
  }

  addStock(symbol, quantity) {
      if(this.props.isCorrectSymbolHandler(symbol)) {
          var oldStocks = {};
          for(var i in this.props.stocks) {
              oldStocks[i] = this.props.stocks[i];
          }
          if(!this.props.stocks.hasOwnProperty(symbol)) {
              if(Object.values(this.props.stocks).length >= 50) {
                  return;
              }
              // Rates and currencies are handled by App
              oldStocks[symbol] = {};
              oldStocks[symbol].value = this.props.getStockValueHandler(symbol);
              oldStocks[symbol].quantity = 0;
              oldStocks[symbol].selected = false;
          }
          oldStocks[symbol].quantity += +quantity;
          // Propagate the new stock to the app
          this.props.setStocksHandler(this.props.k, oldStocks);
      }
  }

  selectStock(symbol, value) {
      this.props.selectHandler(this.props.k, symbol, value);
  }

  deleteStocks() {
      this.props.deleteStocksHandler(this.props.k);
  }

  render() {
      const portfolioStyle = {
          padding: "0.5em", 
          margin: "0.5em", 
          boxShadow: "0px 0px 10px grey"
      };
      var stocks = Object.entries(this.props.stocks).map((p) => <Stock name={p[0]} key={p[0]} value={p[1].value} quantity={p[1].quantity} selected={p[1].selected} currency={this.props.currency} rate={this.props.rate} selectHandler={this.selectStock}/>);
      var value = Object.values(this.props.stocks).reduce((acc, val) => acc + val.value * val.quantity * this.props.rate, 0).toFixed(2);
      var someSelected = Object.values(this.props.stocks).filter(p => p.selected).length > 0;
      return(<div className="col-lg-6">
          <div style={portfolioStyle}>
              <div className="row">
                  <div className="col-lg-4 font-weight-bold"><h5>{this.props.name}</h5></div>
                  <div className="col-lg-1"><button className="btn btn-info btn-sm" data-toggle="modal" data-target={"#modal-rename-"+this.props.k}><span className="oi oi-pencil"></span></button></div>
                  <div className="col-lg-3"><button className="btn btn-link" type="button" onClick={this.showInDollars}>Show in $</button></div>
                  <div className="col-lg-3"><button className="btn btn-link" type="button" onClick={this.showInEuros}>Show in €</button></div>
                  <div className="col-lg-1"><button className="btn btn-danger btn-sm font-weight-bold float-right" onClick={this.deletePortfolio}>&times;</button></div>
              </div><br />
              <table className="table table-sm">
                  <thead className="thead-light">
                      <tr>
                          <th>Name</th>
                          <th>Unit value</th>
                          <th>Nb. of shares</th>
                          <th>Total value</th>
                          <th>Select</th>
                      </tr>
                  </thead>
                  <tbody>
                      {stocks}
                  </tbody>
              </table>
              <p>Total value of {this.props.name} : {value}{this.props.currency}</p>
              <div className="row">
                  <div className="col-lg-3">
                      <button className="btn btn-success" data-toggle="modal" data-target={"#modal-addstock-"+this.props.k}>Add stock</button>
                  </div>
                  <div className="col-lg-3">
                      <button className="btn btn-info" data-toggle="modal" data-target={"#modal-graph-"+this.props.k}>Graph</button>
                  </div>
                  <div className="col-lg-6 text-right">
                      <button className="btn btn-warning" onClick={this.deleteStocks} disabled={!someSelected}>Delete selected</button>
                  </div>
              </div>
          </div>
          <RenamePortfolioModal k={this.props.k} initialName={this.props.name} renameHandler={this.rename}/>
          <AddStockModal k={this.props.k} addStockHandler={this.addStock} isCorrectSymbolHandler={this.props.isCorrectSymbolHandler}/>
          <GraphModal k={this.props.k} name={this.props.name} stocks={this.props.stocks}/>
          
      </div>);
  }
}

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          portfolios: [], 
          portfolioCounter: 0 // We use an index counter to have an unique index for each created portfolios, even when some are deleted. 
      };
      this.stocksData = {};   // Stocks data from iextrading.com API
      this.USDtoEUR = 1; // USD to EUR conversion, from fixer.io API

      // We need these bindings to be able to use 'this' in the handlers
      this.addPortfolio = this.addPortfolio.bind(this);
      this.deletePortfolio = this.deletePortfolio.bind(this);
      this.renamePortfolio = this.renamePortfolio.bind(this);
      this.setStocks = this.setStocks.bind(this);
      this.setCurrency = this.setCurrency.bind(this);
      this.isCorrectSymbol = this.isCorrectSymbol.bind(this);
      this.getStockValue = this.getStockValue.bind(this);
      this.selectStock = this.selectStock.bind(this);
      this.deleteStocks = this.deleteStocks.bind(this);
  }

  refreshSymbolsList() {
      console.log("Refreshing symbols list...");
      /* jQuery.ajax({
          url: "https://api.iextrading.com/1.0/tops/last", 
          dataType: "json", 
          success: (e) => { this.stocksData = Object.values(e).reduce((m, o) => { m[o.symbol] = o.price; return m; }, {}); },
          error: (e) => {alert(`Error while retrieving stocks symbols list...`);} 
      }); */
      fetch("https://api.iextrading.com/1.0/tops/last")
        .then(res => res.json())
        .then((e) => { this.stocksData = Object.values(e).reduce((m, o) => { m[o.symbol] = o.price; return m; }, {}); }, 
        (e) => {alert(`Error while retrieving stocks symbols list...`);});
  }

  refreshCurrencyRate() {
      /* jQuery.ajax({
          url: "http://data.fixer.io/api/latest?access_key=c2ee9ab174d4f390e2dd97796eb51968&symbols=USD", 
          dataType: "json", 
          success: (e) => { this.USDtoEUR = e.success ? 1/e.rates.USD : 1; console.log("cur : "+this.USDtoEUR); },
          error: (e) => { alert(`Error while retrieving currencies rates.`); } 
      }); */
      fetch("http://data.fixer.io/api/latest?access_key=c2ee9ab174d4f390e2dd97796eb51968&symbols=USD")
        .then(res => res.json())
        .then((e) => { this.USDtoEUR = e.success ? 1/e.rates.USD : 1; console.log("cur : "+this.USDtoEUR); },
        (e) => { alert(`Error while retrieving currencies rates.`);})
  }

  componentDidMount() {
      this.refreshCurrencyRate();
      this.refreshSymbolsList();
      this.symbolRefreshId = setInterval(() => this.refreshSymbolsList(), 1000*60*5);   // Refresh symbols list every 5 minutes. 
      this.rateRefreshId = setInterval(() => this.refreshCurrencyRate(), 1000*60*60);   // Refresh currency rate every hour. 
  }

  componentWillUnmount() {
      clearInterval(this.symbolRefreshId);
      clearInterval(this.rateRefreshId);
  }

  addPortfolio(e) {
      if(this.state.portfolios.length < 10) {
        this.setState({
            // React needs the key property to identify components
            portfolios: [].concat(this.state.portfolios, {
                key: this.state.portfolioCounter,
                name: "Portfolio " + (this.state.portfolioCounter + 1),
                currency: '€', 
                rate: this.USDtoEUR, 
                stocks: {}
                /*
                {
                  "Symbol": {
                    "value": X, 
                    "quantity": X, 
                    "selected": X
                  }, 
                  ...
                }
                */
              }), 
              maxPortfolios: (this.state.portfolios.length < 10), 
              portfolioCounter: this.state.portfolioCounter + 1, 
        });
      }
  }

  deletePortfolio(id) {
      this.setState({
          portfolios: this.state.portfolios.filter((p) => p.key !== id), 
          maxPortfolios: (this.state.portfolios.length < 10)
      });
  }

  renamePortfolio(id, newName) {
      this.setState({
          portfolios: this.state.portfolios.map((p) => {
              if(p.key === id) { p.name = newName; }
              return p;
          }),
      });
  }

  setStocks(portfolioId, newStocks) {
      this.setState({
          portfolios: this.state.portfolios.map((p) => {
              if(p.key === portfolioId) { p.stocks = newStocks; }
              return p;
          }),
      });
  }

  setCurrency(portfolioId, currency) {
      this.setState({
          portfolios: this.state.portfolios.map((p) => {
              if(p.key === portfolioId) { 
                  p.currency = currency;
                  p.rate = currency === '€' ? this.USDtoEUR : 1;
              }
              return p;
          }),
      });
  }

  selectStock(portfolioId, symbol, value) {
      this.setState({
          portfolios: this.state.portfolios.map((p) => {
              if(p.key === portfolioId) { 
                  Object.entries(p.stocks).map(s => {
                      if(s[0] === symbol) {
                          s[1].selected = value;
                      }
                      return s;
                  })
              }
              return p;
          }),
      });
  }

  deleteStocks(portfolioId) {
      this.setState({
          portfolios: this.state.portfolios.map((p) => {
              if(p.key === portfolioId) { 
                  p.stocks = (e => {  // Closure to apply custom filter
                      var res = {};
                      Object.entries(e).map(i => {
                          if(!i[1].selected) { res[i[0]] = i[1]; }
                          return i;
                      });
                      return res;
                  })(p.stocks);
              }
              return p;
          }),
      });
  }

  /*
      CACHE SYSTEM
      We use a cache server to keep the stock values. This allows us to limit the rate of API calls
      while maintaining a correct freshness of the results. 
  */

  isCorrectSymbol(stock) {
      return this.stocksData.hasOwnProperty(stock);
  }

  getStockValue(stock) {
      return this.isCorrectSymbol(stock) ? this.stocksData[stock] : 0;
  }

  render() {
      var portfoliosList = [];    // This array is used to split all portfolios into equal sized chunks, to be displayed on rows.
      for(var i = 0; i<this.state.portfolios.length; i+= 2) {
          var chunk = this.state.portfolios.slice(i, i+2).map(p => <Portfolio key={p.key} k={p.key} name={p.name} currency={p.currency} stocks={p.stocks} rate={p.rate} deleteHandler={this.deletePortfolio} renameHandler={this.renamePortfolio} setStocksHandler={this.setStocks} setCurrencyHandler={this.setCurrency} isCorrectSymbolHandler={this.isCorrectSymbol} getStockValueHandler={this.getStockValue} selectHandler={this.selectStock} deleteStocksHandler={this.deleteStocks}/>);
          // We push a chunk in a bootstrap row, and assign to this row an unique key
          portfoliosList.push(<div className="row" key={this.state.portfolios.length + i}>{chunk}</div>);
      }
      return (<div>
          <PrimaryButton text="Add new portfolio" clickHandler={this.addPortfolio} disabled={this.state.portfolios.length >= 10}/>
          {portfoliosList}
      </div>);
  }
}

export default App;
