import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';

const Issue = (props) => {
  return (
    <tr>
      <td className="priority">{ props.priority }</td>
      <td>{ props.status }</td>
      <td>{ props.created }</td>
      <td><Link to={'/issues/' + props.id}>{ props.title }</Link></td>
      <td>{ props.description }</td>
      <td><Link to={'/projects/' + props.projectId}>{ props.projectName }</Link></td>
      <td>{ props.followers }</td>
      <td>{ props.comments }</td>
    </tr>
  );
};

export default withAuth(Issue);
