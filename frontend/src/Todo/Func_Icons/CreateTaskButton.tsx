// CreateTaskButton.jsx
import React from 'react';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

type Props = {
  onClick: () => void;
}

const CreateTaskButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div style={{ transform: 'scale(1)', cursor: 'pointer' }} onClick={onClick}>
        <AddCircleOutlinedIcon />
    </div>
  );
};

export default CreateTaskButton;
