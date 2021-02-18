import React from 'react';
import { TractOwnerShips } from '../App';

type Props = {
  value?: TractOwnerShips[];
  onChange: () => void;
}

const EditTractOwnership: React.FC<Props> = ({ 
  value = [], 
  onChange = () => { } }
  ) => {
  return (
    <h2>
      TODO (WIP)
    </h2>
  );
};

export default EditTractOwnership;
