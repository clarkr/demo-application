import ApiModel from './ApiModel';

class ItemModel extends ApiModel {
  static apiPath = 'items'

  static fields = [
    { key: 'title', name: 'Title', editable: true },
    { key: 'content', name: 'Content', editable: true }
  ];

  get id() {
    return this._param('id');
  }

  get title() {
    return this._param('title');
  }

  get content() {
    return this._param('content');
  }
}

export default ItemModel;
