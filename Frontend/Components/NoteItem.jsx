import React from 'react'
import PropType from 'prop-types'
import AnimateHeight from 'react-animate-height';

class NoteItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showDescription: false
        }
        //this.toggle = this.toggle.bind(this)
    }

    
	;

    toggle = () => {
        this.setState(state => ({
            showDescription: !state.showDescription
        }))
        //this.state.showDescription = !this.state.showDescription
    }
    render(){
        return(
            <div className='shadow-lg p-4 mb-4 w-full'>
                <div className='flex' >
                    {console.log(this.props.note)}
                    <div>{this.props.note.day}</div>
                    <div onClick={this.toggle} className='ml-auto' style={{cursor: 'pointer'}}>Details</div>
                </div>
                <AnimateHeight height={this.state.showDescription ? 'auto' : 0}>
                    <div className='mt-5 text-black'>
                        {this.props.note.title}
                    </div>
                </AnimateHeight>
                
        
            </div>
        )
    }
}


NoteItem.PropType = {
    note: PropType.object
}


export default NoteItem