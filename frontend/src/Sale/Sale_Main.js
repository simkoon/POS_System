import React from "react";
import Sale_TableList from "./Sale_TableList";
import Axios from "axios";
import Loading from "../comm/Loading";
import {Spring, Trail, Transition} from "react-spring";

export default class Sale_Main extends React.Component {
	
	state = {
		tableList: [],
		isLoad: false
	};
	
	componentDidMount = () => {
		this.interval = this.setIntervalAndExecution(this.dataUpdater, 3000);
	};
	
	dataUpdater = () => {
		Axios.get("/api/table").then((response) => {
			this.setState({
				tableList: response.data,
				isLoad: true
			});
		});
	};
	
	setIntervalAndExecution = (callback, timeout) => {
		callback();
		return (setInterval(callback, timeout));
	};
	
	render() {
		
		const {isLoad, tableList} = this.state;
		
		if (!isLoad) {
			return <div></div>
		} else {
			
			return (
				
				<Spring
					from={{
						opacity: 0,
						transform: 'translateY(30px)'
					}}
					to={{
						opacity: 1,
						transform: 'translateY(0px)'
					}}>
					{props =>
						<div style={props}>
							
							<div className={"container content"}>
								<h1 className={"content-header-1"}>
									<Trail
										items={['현', '재', ' 매', '장', '의 ', '정', '보']}
										from={{
											opacity: 0,
											transform: 'translate3d(0,40px,0)'
										}}
										to={{
											opacity: 1,
											transform: 'translate3d(0,0px,0)'
										}}
									>
										{item => props => (
											<span style={props}>{item}</span>
										)}
									</Trail>
								</h1>
								
								<div className={"row"}>
									<div className={"col"}>
										<h4 className={"content-header-4"}>테이블 상태</h4>
										<Sale_TableList tableList={tableList}/>
									</div>
								</div>
							</div>
						
						</div>}
				</Spring>
			
			);
		}
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
}