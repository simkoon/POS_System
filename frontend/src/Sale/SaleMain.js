import React from "react";

export default class SaleMain extends React.Component {
	
	render() {
		return (
			<div className={"container content"}>
				<h1 className={"content-header-1"}>테이블 목록</h1>
				<div className={"row"}>
					<div className={"col"}>
						<h4 className={"content-header-4"}>주문 목록</h4>
					</div>
					<div className={"col"}>
						<h4 className={"content-header-4"}>추가 주문</h4>
					</div>
				</div>
			</div>
		);
	}
}