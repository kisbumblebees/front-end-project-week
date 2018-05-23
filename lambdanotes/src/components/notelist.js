import React from 'react';
import './notelist.css';
import NoteCard from './notecard.js';
import { Row, Col } from 'reactstrap';
import LambdaButton from './lambdabutton.js';


const NoteList = (props) => {
  let cardArr = [];
  for (let i = 0; i < props.notes.length; i = i + 3) {
    let subArr = [];
    for (let j = 0; j < 3 && i + j < props.notes.length; j++) {
      subArr.push(
        <Col className="my-column" xs="4" key={j}>
          <NoteCard viewMethod={props.viewMethod} note={props.notes[i+j]} />
        </Col>
      );
    }
    cardArr.push(
      <Row key={i}>
        {subArr}
      </Row>
    );
  }
  return (
    <div className="notes-view">
      <div className="heading">
        <h5>Your Notes:</h5>
      </div>
      <div className="note-row">
        {cardArr}
      </div>
      <LambdaButton text="Alphabetize Notes" color="green" myFunc={props.alphabetizeNotes} />
    </div>
  );
}

export default NoteList;
