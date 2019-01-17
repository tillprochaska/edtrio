import React from "react";
import { ILearningItem } from "../../interfaces";

import "./style.scss";

interface IProps {
	learningItem: ILearningItem;
	nextCard: (answerKnown: boolean) => () => void,
}

interface IState {
	isFlipped: boolean;
}

export default class FlipCard extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		this.state = {
			isFlipped: false,
		};
	}

	public render() {
		return (
			<li className="flip-card">
				<div
					className={`flip-card__inner ${
						this.state.isFlipped ? "flip-card--is-flipped" : ""
					}`}
				>
					<div className="flip-card__front flip-card__content">
						<h2 className="flip-card__title">
							Kannst du diesen Begriff erklären?
						</h2>
						<p className="flip-card__text">{this.props.learningItem.term}</p>
						<button type="button" onClick={this.showSolution()}>
							Auflösen
						</button>
					</div>
					<div className="flip-card__back flip-card__content">
						<h2 className="flip-card__title">Erklärung:</h2>
						<p className="flip-card__text">
							{this.props.learningItem.description}
						</p>
						<button type="button" onClick={this.props.nextCard(true)}>
							JA
						</button>
						<button type="button" onClick={this.props.nextCard(false)}>
							NEIN
						</button>
					</div>
				</div>
			</li>
		);
	}

	protected showSolution() {
		return () => {
			this.setState({ isFlipped: true });
		}
	}
}
