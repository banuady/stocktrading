import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Table, Popup } from 'semantic-ui-react';

class IndividualStock extends React.Component {
  renderStockInfo(stock) {
    return (
      <Table.Cell>
        <Popup trigger={<Link to={`/stocks/edit/${stock.id}`}>{stock.symbol}</Link>} content={stock.name} />
      </Table.Cell>
    );
  }

  renderPurchasedStock(stock) {
    const totalPurchasePrice =
      parseInt(stock.purchased.quantity) * parseInt(stock.purchased.unitPrice) + parseInt(stock.purchased.fees);
    return (
      <Table.Cell>
        <Popup
          trigger={
            <h5>
              <b>${totalPurchasePrice.toFixed(2)}</b>
            </h5>
          }
        >
          Units: {stock.purchased.quantity} <br />
          Stock Price: ${stock.purchased.unitPrice} <br />
          Brokerage Fees: ${stock.purchased.fees}
        </Popup>
        {stock.purchased.date}
      </Table.Cell>
    );
  }

  renderSoldStock(stock) {
    if (stock.sold) {
      const totalSoldPrice = stock.sold.quantity * stock.sold.unitPrice - stock.sold.fees;

      return (
        <Table.Cell>
          <Popup
            trigger={
              <h5>
                <b>${totalSoldPrice.toFixed(2)}</b>
              </h5>
            }
          >
            Units: {stock.sold.quantity} <br />
            Stock Price: ${stock.sold.unitPrice} <br />
            Brokerage Fees: ${stock.sold.fees}
          </Popup>
          {stock.sold.date}
        </Table.Cell>
      );
    } else {
      return (
        <Table.Cell>
          <Link to={`/stocks/sell/${stock.id}`} className="ui button primary">
            Sell
          </Link>
        </Table.Cell>
      );
    }
  }

  renderDividents(stock) {
    if (stock.dividents) {
      return (
        <Table.Cell>
          <Popup
            trigger={
              <h5>
                <b>${stock.dividents.quantity * stock.dividents.unitPrice}</b>
              </h5>
            }
          >
            Units: {stock.dividents.quantity} <br />
            Unit Price: {stock.dividents.unitPrice}
          </Popup>
          {stock.dividents.date}
        </Table.Cell>
      );
    } else {
      return (
        <Table.Cell>
          <Link to={`/dividents/add/${stock.id}`} className="ui button primary">
            Add
          </Link>
        </Table.Cell>
      );
    }
  }

  renderPLStock(stock) {
    if (stock.sold) {
      const purchasedDate = dayjs(stock.purchased.date);
      const soldDate = dayjs(stock.sold.date);
      const daysDiff = soldDate.diff(purchasedDate, 'day');

      const buyTotal = stock.purchased.quantity * stock.purchased.unitPrice;
      const sellTotal = stock.sold.quantity * stock.sold.unitPrice;
      const dividentsTotal = stock.dividents ? stock.dividents.quantity * stock.dividents.unitPrice : 0;
      const totalFees = parseInt(stock.purchased.fees) + parseInt(stock.sold.fees);

      const profit = sellTotal - buyTotal + dividentsTotal - totalFees;
      const realised = (profit * 100) / buyTotal;
      const anualized = (realised * 365) / daysDiff;

      const colorCell = profit > 0 ? 'positive' : 'negative';

      return (
        <Table.Cell positive={profit > 0} negative={profit < 0}>
          Hold for {daysDiff} days
          <br />
          Profit: <b>${profit.toFixed(2)}</b> ({realised.toFixed(2)}%)
          <br />
          Anualized: {anualized.toFixed(2)}%
        </Table.Cell>
      );
    } else {
      return <Table.Cell>Unknown</Table.Cell>;
    }
  }

  render() {
    return (
      <Table.Row key={this.props.stock.id} warning={!this.props.stock.sold}>
        {this.renderStockInfo(this.props.stock)}
        {this.renderPurchasedStock(this.props.stock)}
        {this.renderSoldStock(this.props.stock)}
        {this.renderDividents(this.props.stock)}
        {this.renderPLStock(this.props.stock)}
        <Table.Cell className="right floated content">
          <Link to={`/stocks/delete/${this.props.stock.id}`} className="ui button negative">
            x
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default IndividualStock;
