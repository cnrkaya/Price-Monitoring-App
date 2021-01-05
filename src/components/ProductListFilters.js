import React, { useState } from 'react';
import { setTextFilter, sortByDate, sortByCurrentPrice, sortByTargetPrice, setStartDate, setEndDate } from '../actions/filters';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

export const ProductListFilters = (props) => {
    const [calendarFocus, setCalendarFocus] = useState(null);
    const onDatesChange = ({ startDate, endDate }) => {
        props.setStartDate(startDate);
        props.setEndDate(endDate);
    }
    const onFocusChange = (calendarFocus) => {
        setCalendarFocus(calendarFocus);
    }
    const onTextChange = (e) => {
        props.setTextFilter(e.target.value);
    }
    const onSortChange = (e) => {
        const value = e.target.value;
        if (value === 'date') {
            props.sortByDate();
        } else if (value === 'current_price') {
            props.sortByCurrentPrice();
        } else if (value === 'target_price') {
            props.sortByTargetPrice();
        }
    }
    return (
        <div className="content-container">
            <div className="input-group">
                <div className="input-group__item">
                    <input 
                        type='text'
                        className="text-input"
                        placeholder='Search products'
                        value={props.filters.text}
                        onChange={onTextChange}
                    />
                </div>
                <div className="input-group__item">
                    <select
                        className="select"
                        value={props.filters.sortBy}
                        onChange={onSortChange}
                    >
                        <option value='date'>Date</option>
                        <option value='current_price'>Current Price</option>
                        <option value='target_price'>Target Price</option>
                    </select>
                </div>
                <div className="input-group__item">
                    <DateRangePicker 
                    startDate={props.filters.startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={props.filters.endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={onDatesChange}
                    focusedInput={calendarFocus}
                    onFocusChange={onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByCurrentPrice: () => dispatch(sortByCurrentPrice()),
    sortByTargetPrice: () => dispatch(sortByTargetPrice()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListFilters);