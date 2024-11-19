import Footer from './components/Footer'
import Header from './components/Header'
import Note from './components/Note'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Note
          title='This is the note title'
          content='This is the note content'
        />
      </main>
      <Footer />
    </>
  )
}

export default App
