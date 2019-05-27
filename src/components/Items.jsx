import React from 'react';
import _ from 'lodash';

import ItemModel from '../api/ItemModel';

import ReactDataGrid from "react-data-grid";

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
    this.itemModel = new ItemModel();

    this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    return ItemModel.getAll().then((items) => {
      this.setState({ items });
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
    return (
      <ReactDataGrid
        columns={this.columns}
        rowGetter={i => this.state.items[i]}
        rowsCount={this.state.items.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
      />
    );
  }
}

export default Items;
