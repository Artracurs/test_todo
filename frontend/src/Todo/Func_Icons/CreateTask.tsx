import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

type Props = {}

export default function CreateTask({}: Props) {
  return (
    <div style={{ transform: 'scale(1)', cursor: 'pointer' }}>
        <AddCircleOutlinedIcon />
    </div>
  )
}