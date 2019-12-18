import React from 'react'
import PropType from 'prop-types'
import moment from 'moment'
import axios from 'axios'
import NoteItem from '../Components/NoteItem.jsx'
class Note extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            journalDay: []
        }
    }
    componentDidMount(){
        axios.get('/journals').then(response => {
            console.log(response.data[0].journalDay)
            this.setState({journalDay:  response.data[0].journalDay})
        })
    }
    render(){
        return(
            <div className='w-full'>
                <h1 className="text-xl">{this.props.date}</h1>
                <div className='w-full flex justify-center flex-col items-center'>
                    <h2 className='mx-auto font-4xl' style={{fontSize: '30px'}}>Horario Martes/17 - Viernes/20</h2>
                    <h2 className='mx-auto font-4xl' style={{fontSize: '30px'}}>Listas de tareas por hacer</h2>
                    <div className='w-2/4'>
                        {this.state.journalDay.length > 0 ? this.state.journalDay.map(elemento => (
                           
                            <NoteItem note={elemento} key={elemento.id}/>
                        )) : null }
                    </div>
                    
                </div>
            </div>
        )
    }
}


Note.PropType = {
    gratitude: PropType.string
}
Note.defaultProps = {
    gratitude: 'hey',
    date: moment().format('MMMM Do YYYY')
}
export default Note