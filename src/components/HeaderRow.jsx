import React from 'react';

import PropTypes from 'prop-types';

class HeaderRow extends React.Component {
  render() {
    const member = this.props.member;
    return (
      <thead>
        <tr>
          {member.fields.map((field) => {
            return <th key={member.fieldKey(field)}>{field.name}</th>;
          })}
        </tr>
      </thead>
    );
  }
}

HeaderRow.propTypes = {
  member: PropTypes.object
};

export default HeaderRow;
