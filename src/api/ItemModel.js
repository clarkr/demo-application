import ApiModel from './ApiModel';

class ItemModel extends ApiModel {
  static apiPath = 'items'

  static fields = [
    { key: 'id', name: 'Id', editable: false },
    { key: 'title', name: 'Title', editable: true },
    { key: 'content', name: 'Content', editable: true }
  ];
}

export default ItemModel;
