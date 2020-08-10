import React, { Component } from 'react'


export default class APP extends Component {
    super(props)
    constructor (props, context) {

    }

    componentDidMount() {
        this.init()
    }

    init () {
        console.log('init')
    }

    render () {
        return (
            <LocalProvider>
                <div id="container">Demonstration page</div>
            </LocalProvider>
        )
    }
}