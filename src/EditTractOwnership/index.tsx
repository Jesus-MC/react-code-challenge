import React, { useRef, useEffect, useState } from 'react';
import { TractOwnerShips } from '../App';
import { Container, Row, Col, Form, Button, Table, InputGroup, Jumbotron } from 'react-bootstrap';
import './index.css';
import Icon from '../Icon';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  value?: TractOwnerShips[];
  handleAddNPRI: () => void;
  handleRemove:(id: string) => any;
  handleSave: (values: any) => any;
  handleUpdate: (tractValues: any) => any;
}

const EditTractOwnership: React.FC<Props> = ({
  value,
  handleAddNPRI,
  handleRemove,
  handleSave,
  handleUpdate
}) => {


  const [ singleTractData, setSingleTractData ] = useState({
    owner: '', 
    interest: '', 
    lease: '',
    npri_owner: '', 
    npri_interest: '' 
  })

  const [ npriData, setNpriData ] = useState(0);
  const [ tractId, setTractId ] = useState('');
  const [ uploadBtn, setUploadBtn ] = useState(false); 

  useEffect(() => {
    
  }, [tractId])

  const ownerRef = useRef<HTMLInputElement>(null);
  const interestRef = useRef<HTMLInputElement>(null);
  const leaseRef = useRef<HTMLInputElement>(null);
  const npri_ownerRef = useRef<HTMLInputElement>(null);
  const npri_interestRef = useRef<HTMLInputElement>(null);

  const { owner, interest, lease, npri_owner, npri_interest } = singleTractData;

  const setData = (id: string) => {
    setUploadBtn(true);
    setTractId(id);
    const tractData: any = value?.find((item: any) => item.id === id)    
    // @ts-ignore
    ownerRef.current.value = tractData.owner;
    // @ts-ignore
    interestRef.current.value = tractData.interest;
    // @ts-ignore
    leaseRef.current.value = tractData.lease;
    Object.keys(tractData.npris).map((key: any) => {  
      // @ts-ignore    
    npri_ownerRef.current.value = tractData.npris[key].npri_owner;
    // @ts-ignore
    npri_interestRef.current.value = tractData.npris[key].npri_interest;
    });
    setSingleTractData(tractData);
  }

  const handleChange = (e: any) => {
    setSingleTractData({
      ...singleTractData,
      [e.target.name]: e.target.value
    })
  }


  const onSubmit = (e: any) => {    
    e.preventDefault();
    if (!tractId) {
      let tractValues: any = {
        owner: owner,
        interest: interest,
        lease: lease,
        npris: [{
          npri_owner: npri_owner,
          npri_interest: npri_interest
        }]
      }
      tractValues.id = uuidv4();
      Object.keys(tractValues.npris).map((key: any) => tractValues.npris[key].npri_id = uuidv4());
      handleSave(tractValues);
      resetFormFields();
    } else {
      let tractValues: any = {
        owner: owner,
        interest: interest,
        lease: lease,
        npris: [{
          npri_owner: singleTractData.npri_owner,
          npri_interest: singleTractData.npri_interest
        }]
      }
      tractValues.id = tractId;
      Object.keys(tractValues.npris).map((key: any) => tractValues.npris[key].npri_id = uuidv4());
      handleUpdate(tractValues);
      setUploadBtn(false);
      resetFormFields();
      
    }  
  }
  
  const addNpriRow = () => {
    setNpriData(npriData +1)
  }

  const resetFormFields = () => {
    // @ts-ignore
    ownerRef.current.value = '';
    // @ts-ignore
    interestRef.current.value = '';
    // @ts-ignore
    leaseRef.current.value = '';
    // @ts-ignore
    npri_ownerRef.current.value = '';
    // @ts-ignore
    npri_interestRef.current.value = '';
    setSingleTractData({
      owner: '', 
      interest: '', 
      lease: '',
      npri_owner: '', 
      npri_interest: '' 
    });
  }

  return (
    <Container>
      <form onSubmit={onSubmit} >
        <Row>
          <Col md={3}><p>Owner</p></Col>
          <Col md={3}><p>Mineral Interest</p></Col>
          <Col md={3}><p>NPRI</p></Col>
          <Col md={3}><p>Lease</p></Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Control 
              required
              type='text' 
              placeholder='Owner' 
              name='owner' 
              onChange={handleChange} 
              ref={ownerRef}
              //value={ownerRef}
            />
          </Col>
          <Col md={3}>
            <InputGroup className="mb-3">
              <Form.Control
                required
                type='text'
                placeholder="Interest"
                name='interest'
                onChange={handleChange}
                ref={interestRef}
                //value={interestRef}
              />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col md={3}>
          </Col>
          <Col md={3}>
            <Form.Control
              required 
              type='text' 
              placeholder='Lease' 
              name='lease' 
              onChange={handleChange} 
              ref={leaseRef}
              //value={leaseRef}
            />
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <div className=''>
              <Row>
                <Col sm={1}>
                <Icon icon="indent" />
                </Col>
                <Col>
                  <Form.Control 
                    required 
                    type='text' 
                    placeholder='NPRI Owner' 
                    name='npri_owner' 
                    onChange={handleChange} 
                    ref={npri_ownerRef}
                    //value={npri_ownerRef}
                  />
                </Col>
              </Row>
            </div>  
          </Col>
          <Col md={3}></Col>
          <Col md={3}>            
            <InputGroup className="mb-3">
                <Form.Control
                  required
                  type='text'
                  placeholder="NPRI Interest"
                  name='npri_interest'
                  onChange={handleChange}
                  ref={npri_interestRef}
                  //value={npri_interestRef}
                />
                <InputGroup.Append>
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col md={3}>
            <Row>
              <Col></Col>
              <Col sm={3}>
                <Button variant="outline-dark" className='btn-remove'>
                  <Icon icon='remove'/>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <div className='btn-container'>
              <Button variant="outline-dark" className='btn-add' onClick={addNpriRow}>
                <Icon icon="add" />
                Add NPRI
              </Button>
            </div>
          </Col>
          <Col md={9}>
            { uploadBtn ? 
              <Button variant="outline-success" className='btn-save' type='submit'>Update</Button>:
              <Button variant="outline-success" className='btn-save' type='submit'>Save</Button> 
              
            }
            
          </Col>
        </Row>
      </form>
      
      { value!.length === 0 ? 
        <Jumbotron className='mb-3'>          
          <h2 className='data-label'>No hay datos</h2>
        </Jumbotron> :
        <Table striped bordered hover className='data-table'>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Mineral Interest</th>
              <th>Lease</th>
              <th>Actions</th>
            </tr>
          </thead>
          {
            value!.map((item: TractOwnerShips) =>
              <tbody>
                <tr key={item.id}>
                  <td>{item.owner ? item.owner : 'N/A'}</td>
                  <td>{item.interest ? item.interest : 'N/A'}</td>
                  <td>{item.lease ? item.lease : 'N/A'}</td>
                  <td>
                    <Button variant="outline-primary" onClick={() => setData(item!.id!)}>See data</Button>
                    <Button variant="outline-danger" className='btn-delete' onClick={() => handleRemove(item!.id!)}>Delete</Button>
                  </td>
                </tr>
              </tbody>
              )
            }
        </Table> 
        
      }
    </Container>
  );
};

export default EditTractOwnership;
