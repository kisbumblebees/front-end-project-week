import React from 'react';
import NoteList from './notelist.js';

const ContentArea = (props) => {
  switch (props.appState) {
    case "list":
      return (
        <NoteList />
      );
    default:
      return (
        <div />
      );
  }
}

export default ContentArea;