import { Component } from 'react';
import data from './../data.json';
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { AddData, fetchData, fetchAccounts } from './../Redux/actions/useraction'
import { bindActionCreators } from 'redux'

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newData: [],
            dataload: this.props.msg === "" ? 'fetching' : 'fetched'
        }
    }

    addData() {
        this.props.AddData(data)
    }
    componentDidMount() {
        this.props.fetchData();
    }
    render() {
        let userData = []
        let ele = null;
        this.props.userList.map((data) => {
            const { id, title, name } = data;
            ele = (<tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{title}</td>
            </tr>)
            return userData.push(ele);
        })
        return (
            <div>
                <div>
                    <h1>Data {this.props.msg === "" ? 'fetching' : 'fetched'} from Firebase Real Time Database</h1>
                    {userData && userData.length !== 0  && <Link className="btn btn-info" to="Apps">Go To Apps</Link>}
                </div>

                {userData && userData.length !== 0 ?
                    <div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData}
                            </tbody>
                        </Table>
                    </div> : <div> <h4>{this.props.msg }</h4>{this.props.msg === "" ? <Spin tip="Loading..."></Spin> : this.props.msg === "No Data" && <Button onClick={() => { this.addData() }}>
                        Add data from Data.json file
                    </Button>}
                    </div>}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        userList: state.user.userList,
        msg: state.user.msg
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            AddData,
            fetchData,
            fetchAccounts
        },
        dispatch
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList)