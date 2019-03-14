import React,{ Component } from 'react'
import styles from './Selects.scss'

class Selects extends Component {
  constructor ( props ){
    super( props )

    this.state = {
      showOptions: false
    }
    
    this.onShow = this.onShow.bind( this )
    this.onSelectItem = this.onSelectItem.bind( this )
    this.rootEl = React.createRef()
    this.onHandleClickOutside = this.onHandleClickOutside.bind(this)
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.onHandleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.onHandleClickOutside)
  }

  onHandleClickOutside (e) {
    const target = e.target
    const {current} = this.rootEl
    if(!current.contains(target)) {
      this.setState({
        showOptions: false
      })
    }
  }

  onShow ( e ) {
    e.preventDefault()
    e.stopPropagation()
    this.setState( { showOptions: true } )
    return this.props.onOpen && this.props.onOpen()
  }

  onSelectItem ( e, value ) {
    e.preventDefault()
    e.stopPropagation()
    this.setState( {
      showOptions: false,
      label: value
    } )
    if( typeof ( this.props.onChange ) === 'function' ){
      this.props.onChange( value )
    }
  }

  render () {    
    const label = this.state.label || this.props.label
    const { isFont } = this.props
    return (
      <div className={styles.selects} ref={this.rootEl}
        onClick={this.onShow}
        onKeyDown={()=>{}}>

        <span className={styles.label}>{label}</span>

        {this.state.showOptions &&
          <ul className={styles.list}>
            {!this.props.children ? 
              this.props.list.map( item => {
                return  isFont
                  ? <li key={item}
                    className={item.replace( /\s\S/gi,'' )}>
                    <button onClick={( e ) => this.onSelectItem( e, item )}
                      style={{ fontFamily: item }}>
                      {item}
                    </button>
                  </li>
                  : <li key={item}>
                    <button onClick={( e ) => this.onSelectItem( e, item )}>
                      {item}
                    </button>
                  </li> 
              } ) : this.props.children
            }
          </ul>
        }
        <span className={styles.icon}>
        </span>
      </div>
    )
  }
}

export {
  Selects
}