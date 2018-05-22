import React from 'react';
import NoteList from './notelist.js';
import NoteView from './noteview.js';
import NoteForm from './noteform.js';


const ContentArea = (props) => {
  let myNote;
  switch (props.appState) {
    case "list":
      return (
        <NoteList viewMethod={props.viewMethod} notes={props.notes} />
      );
    case "deleting":
    case "view":
      myNote = props.notes.filter((note) => note.id === props.viewId)[0];
      return (
        <NoteView appState={props.appState}
          note={myNote}
          deleteMethod={props.deleteMethod}
          reallyDeleteMethod={props.reallyDeleteMethod}
          cancelDeleteMethod={props.cancelDeleteMethod} />
      );
    case "create":
      return (
        <NoteForm topText="Create New Note" />
      );
    default:
      return (
        <div />
      );
  }
}

export default ContentArea;
