import ImageUploader from './components/ImageUploader'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <ImageUploader/>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
