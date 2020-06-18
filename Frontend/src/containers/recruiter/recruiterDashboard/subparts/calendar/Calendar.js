import React from "react";
import {connect} from "react-redux";
import {format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameDay, isSameMonth, parse, addMonths, subMonths} from 'date-fns';
import randomcolor from 'randomcolor';

import {authDetails} from '../../../../../redux/auth/auth-action';

import InterviewCard from './InterviewCard/InterviewCard';

import './Calendar.css';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "iiii";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
        <div className="Calendar--Container">
            <h1 className="Calendar--Heading">Scheduled Interviews</h1>
            <div className="Calendar--Content">
              <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
              </div>
              <div className="Calendar--Meetings">
                <InterviewCard color={randomcolor()} name="Ashish yadav" post="machine learning" />
                <InterviewCard color={randomcolor()} name="Ashish yadav" post="machine learning" />
                <InterviewCard color={randomcolor()} name="Ashish yadav" post="machine learning" />
                <InterviewCard color={randomcolor()} name="Ashish yadav" post="machine learning" />
              </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.auth,
})

const mapDispatchToProps = dispatch => ({
  authFunction: data => dispatch(authDetails(data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);