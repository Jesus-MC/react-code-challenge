import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import EditTractOwnership from './EditTractOwnership';
import Icon from './Icon';

export type TractOwnerShips = {
  id?: string;
  owner?: string;
  interest?: number; 
  lease?: string; 
  npris?: NPRIsData[];
}

export type NPRIsData = {
  npri_id?: string; 
  npri_owner?: string; 
  npri_interest?: number;  
}

let tractOwnerships: any = [{
  id: uuidv4(),
    owner: 'Luke Skywalker',
    interest: 0.5,
    lease: 'Tatooine Lease',
    npris: [
      {
        npri_id: uuidv4(),
        npri_owner: 'Leia Organa',
        npri_interest: 0.45,
      },
      {
        npri_id: uuidv4(),
        npri_owner: 'Han Solo',
        npri_interest: 0.15,
      },
    ],
  },
  {
    id: uuidv4(),
    owner: 'Steve Rogers',
    interest: 115,
    lease: 'James Barnes',
    npris: [
      {
        npri_id: uuidv4(),
        npri_owner: 'Sam Wilson',
        npri_interest: 22,
      }
    ],
}];

function App() {
  if (!tractOwnerships) {
    tractOwnerships = [];
  }

  const [ tractData, setTractData ] = useState<TractOwnerShips[]>(tractOwnerships ? tractOwnerships : []);
  
  useEffect(() => {
    try{

    } catch(error) {
      alert(error)
    }
  }, [tractData])

  const handleSave = (values: TractOwnerShips) => {
    setTractData([ ...tractData, values ])
  }
  
  const handleRemove = (id: string) => {
    const newTract = tractData.filter((item: any) => item.id !== id);
    setTractData(newTract);
    alert('Deleted data');
  }

  const handleUpdate = (values: TractOwnerShips, index: number) => {
    tractData.splice(index, 1, values)
    setTractData(tractData);
    alert('Updated data');
  }

  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1>
              Landdox Code Challenge <Icon icon="smile" />
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <EditTractOwnership 
            value={tractData}
            handleSave={handleSave}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
