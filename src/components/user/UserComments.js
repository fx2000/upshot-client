import React from 'react';
import { withAuth } from '../../lib/AuthProvider';

const UserComments = (props) => {
  return (
    <tr>
      <td>{ props.issue }</td>
      <td>{ props.content }</td>
      <td>{ props.relativeDate }</td>
    </tr>
  );
};

export default withAuth(UserComments);
