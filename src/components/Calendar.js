import React from "react";
import dateFns from "date-fns";
import { Button } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const calendarModes = ['Month', 'Week']

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      currentMonth: new Date(),
      currentWeek: new Date(),
      selectedDate: new Date(),
      calendarMode: calendarModes[0]
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }



  renderCalendarToolbar() {
    return (
        <div className="header rows flex-middle">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle outline color="secondary" size="sm" caret>
          View
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick = {() => this.setCalendarMode(calendarModes[0])}>Month</DropdownItem>
          <DropdownItem onClick = {() => this.setCalendarMode(calendarModes[1])}>Week</DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </div>
    )
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header rows flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderHeaderWeekMode() {
    const weekFormat = "dddd D"
    const weekHeadingFormat = "MMM YYYY"
    const days = []

    let startDate = dateFns.startOfWeek(this.state.currentWeek);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), weekFormat)}
        </div>
      );
    }

    return (
      <div className="header rows flex-middle">

        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>chevron_left</div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentWeek, weekHeadingFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">chevron_right</div>
        </div>
        <div className="days rows">{days}</div>

      </div>
    )
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days rows">{days}</div>;
  }


  renderCellsWeekMode() {
    const rows = [];
    let cells = [];

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 7; j++) {


      }
    }

  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="rows" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  setCalendarMode = mode => {
    this.setState({
      calendarMode: mode
    })
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  nextWeek = () => {
    this.setState({
      currentWeek: dateFns.addDays(this.state.currentWeek, 7)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  prevWeek = () => {
    this.setState({
      currentWeek: dateFns.subDays(this.state.currentWeek, 7)
    });
  };

  render() {
    const { calendarMode } = this.state
    return (
      <div className="calendar">
        {calendarMode === calendarModes[0] && this.renderHeader()}
        {calendarMode === calendarModes[0] && this.renderDays()}
        {calendarMode === calendarModes[0] && this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
