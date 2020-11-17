import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Table, Popup } from 'semantic-ui-react';

class IndividualStock extends React.Component {
  renderStockInfo(stock) {
    return (
      <div>
        <Popup trigger={<Link to={`/stocks/edit/${stock.id}`}>{stock.symbol}</Link>} content={stock.name} />
      </div>
    );
  }

  renderPurchasedStock(stock) {
    return (
      <div>
        <Popup
          trigger={
            <h5>
              <b>${stock.purchased.quantity * stock.purchased.unitPrice - stock.purchased.fees}</b>
            </h5>
          }
        >
          Units: {stock.purchased.quantity} <br />
          Stock Price: ${stock.purchased.unitPrice} <br />
          Brokerage Fees: ${stock.purchased.fees}
        </Popup>
        {stock.purchased.date}
      </div>
    );
  }

  renderSoldStock(stock) {
    if (stock.sold) {
      return (
        <div>
          <Popup
            trigger={
              <h5>
                <b>${stock.sold.quantity * stock.sold.unitPrice - stock.sold.fees}</b>
              </h5>
            }
          >
            Units: {stock.sold.quantity} <br />
            Stock Price: ${stock.sold.unitPrice} <br />
            Brokerage Fees: ${stock.sold.fees}
          </Popup>
          {stock.sold.date}
        </div>
      );
    } else {
      return (
        <div>
          <Link to={`/sell/${stock.id}`} className="ui button primary">
            Sell
          </Link>
        </div>
      );
    }
  }

  renderPLStock(stock) {
    if (stock.sold) {
      const purchasedDate = dayjs(stock.purchased.date);
      const soldDate = dayjs(stock.sold.date);
      const daysDiff = soldDate.diff(purchasedDate, 'day');

      const buyTotal = stock.purchased.quantity * stock.purchased.unitPrice - stock.purchased.fees;
      const sellTotal = stock.sold.quantity * stock.sold.unitPrice - stock.sold.fees;

      const profit = sellTotal - buyTotal;
      const realised = profit > 0 ? (profit * 100) / buyTotal : (-profit * 100) / buyTotal;
      const anualized = (profit * 365) / daysDiff;

      return (
        <div>
          Hold for {daysDiff} days
          <br />
          Profit: <b>${profit}</b> (+{realised.toFixed(2)}%)
          <br />
          Anualized: {anualized.toFixed(2)}%
        </div>
      );
    } else {
      return <div>Unknown</div>;
    }
  }

  render() {
    return (
      <Table.Row key={this.props.stock.id}>
        <Table.Cell>{this.renderStockInfo(this.props.stock)}</Table.Cell>
        <Table.Cell>{this.renderPurchasedStock(this.props.stock)}</Table.Cell>
        <Table.Cell>{this.renderSoldStock(this.props.stock)}</Table.Cell>
        <Table.Cell>{this.renderPLStock(this.props.stock)}</Table.Cell>
        <Table.Cell className="right floated content">
          <Link to={`/stocks/delete/${this.props.stock.id}`} className="ui button negative">
            Delete
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default IndividualStock;
