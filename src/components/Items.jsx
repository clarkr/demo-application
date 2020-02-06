import React from 'react';
import _ from 'lodash';

import Item from './Item';

import ItemModel from '../api/ItemModel';
import AddItemButton from './AddItemButton';

import { Alert, Table } from 'reactstrap';

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [], loading: true };
    this.itemModel = new ItemModel();

    this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleCollectionChange = this.handleCollectionChange.bind(this);
  }

  handleCollectionChange() {
    this.setState({ items: ItemModel.all });
  }

  loadData() {
    return ItemModel.getAll().then((items) => {
      this.setState({ items: ItemModel.all, loading: false });
    }, (error) => {
      console.error(error);
    });
	}

  componentDidMount() {
    return this.loadData();
  };

  get columns() {
    return ItemModel.fields;
  }

  onGridRowsUpdated({ fromRow, toRow, updated }) {
    this.setState((state) => {
      const items = state.items.slice();
      const item = this.state.items[fromRow];
      item.update(updated);
      items[fromRow] = new ItemModel(_.merge(item._params, updated));
      return { items };
    });
  };

  render() {
    const headerStyle = { width: `${100 / this.columns.length + 1}%` };
    return (
      <>
        <div className='table-title'>Items</div>
        { this.state.items.length === 0 && !this.state.loading ?
          <Alert color='primary'>
            Use this table to manage all your items. An item can be anything with a title and
            content. Click the 'Add Item' button to get started.
          </Alert> :
          '' 
        }
        <Table className='table-striped'>
          <thead>
            <tr>
              {this.columns.map((column) =>
                <th style={headerStyle} key={`header-${column.key}`}>{_.startCase(column.key)}</th>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item) =>
              <Item
                item={item}
                onItemRemoved={this.handleCollectionChange}
                key={item.uniqueKey}
              />
            )}
          </tbody>
        </Table>
        { !this.state.loading ? <AddItemButton onItemAdded={this.handleCollectionChange} /> : '' }
      </>
    );
  }
}

export default Items;
