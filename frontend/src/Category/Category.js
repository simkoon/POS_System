import React from 'react';
import CategoryList from "./Category_List";
import Menu_List from "./Menu_List";
import Axios from "axios";
import Loading from "../comm/Loading";
import qs from 'qs'
import InvoiceList from "../Invoice/InvoiceList";
import InvoiceDetail from "../Invoice/InvoiceDetail";

class Category extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	state = {
		data: [],
		categ_name: '',
		menu_list: [],
		detail: {},
		isLoad: false
	};
	
	componentDidMount = () => {
		this.interval = this.setIntervalAndExecution(this.dataUpdater, 3000);
	};
	
	setIntervalAndExecution = (callback, timeout) => {
		callback();
		return (setInterval(callback, timeout));
	};
	
	dataUpdater = () => {
	
		Axios.get('/api/menu').then((response) => {
			this.setState({
				data: response.data,
				isLoad: true
			})
		});
		
		if(this.state.categ_name != '') {
		Axios.get("/api/category/menulists/" + this.state.categ_name).then(response => {
			this.setState({
				menu_list: response.data
			});
		});
		}
		
	};
	
	clickHandler = (item) => {
		this.setState({
			categ_name: item.CATEG_NAME
		}, () => {
			this.dataUpdater();
		});
	};
	
	
	render() {
		
		console.log("rendered");
		
		const {isLoad} = this.state;
		
		if (!isLoad) {
			return <Loading msg="메뉴 목록을 로딩중입니다."></Loading>
			
			
		} else {
			return (
				<div className={"container content"}>
					
					<h1 className={"content-header-1"}>
						메뉴 관리
					</h1>
					
					<div className={"row"}>
						<div className={"col"} style={{maxWidth: "300px"}}>
							<h4 className={"content-header-4"}>카테고리 목록</h4>
							<CategoryList data={this.state.data} onClick={this.clickHandler}/>
						</div>
						<div className={"col"}>
							<h4 className="content-header-4">메뉴 목록</h4>
							<Menu_List detail={this.state.menu_list} dataUpdater={this.dataUpdater}/>
						</div>
					</div>
				
				</div>
			)
		}
		
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
}

export default Category;
