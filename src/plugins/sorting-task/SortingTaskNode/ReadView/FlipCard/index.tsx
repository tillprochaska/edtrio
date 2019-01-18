import React from "react";
import { ILearningItem } from "../../interfaces";

import mdiconCheck from './mdicon-check.svg';
import mdiconClose from './mdicon-close.svg';
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
						<p className="flip-card__text">
							{this.props.learningItem.term}
						</p>
						<div className="flip-card__footer">
							<button className="flip-card__button flip-card__button--flip" type="button" onClick={this.showSolution()}>
								Erklärung anzeigen
							</button>
						</div>
					</div>
					<div className="flip-card__back flip-card__content">
						<h2 className="flip-card__title">Richtig gewusst?</h2>
						<p className="flip-card__text">
							<b>Erklärung:</b> {this.props.learningItem.description}
						</p>
						<div className="flip-card__footer">
							<button className="flip-card__button flip-card__button--has-icon flip-card__button--not-known" type="button" onClick={this.props.nextCard(false)}>
								<img className="md-icon" src={mdiconClose} alt="Nein, dass wusste ich leider nicht."/>
							</button>
							<button className="flip-card__button flip-card__button--has-icon flip-card__button--known" type="button" onClick={this.props.nextCard(true)}>
								<img className="md-icon" src={mdiconCheck} alt="Ja, meine Erklärung war korrekt"/>
							</button>
						</div>
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
