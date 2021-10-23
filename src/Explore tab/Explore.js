import React from 'react';
import "../SidebarOption.css";
import "../Feed";
import Trends from './ExploreTweet';

export default function explore() {
    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Explore</h2>
            </div>
            <Trends/>
        </div>
    )
}