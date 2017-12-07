/* 
    Copyright (C) 2017 Bogumil Bartczak

    This file is part of opr-renderer.

    opr-renderer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    opr-renderer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with opr-renderer.  If not, see <http://www.gnu.org/licenses/>.
*/

class PlainOPRContextContentData {
    constructor() {

        let _reportTopicLabel = "Topic";
        let _reportTopic = "No topic specified";
        let _reportTopicMotivationLabel = "Motivation";
        let _reportTopicMotivation = "no specific motivation given";
        let _reporterLabel = "Reporter";
        let _reporter = "n. n.";

        this.getTopicLabel = function() {
            return _reportTopicLabel;
        }
        this.setTopicLabel = function(topicLabel) {
            _reportTopicLabel = topicLabel;
        }
        this.getTopic = function() {
            return _reportTopic;
        }
        this.setTopic = function(topic) {
            _reportTopic = topic;
        }
        this.getTopicMotivationLabel = function() {
            return _reportTopicMotivationLabel;
        }
        this.setTopicMotivationLabel = function(motivationLabel) {
            _reportTopicMotivationLabel = motivationLabel;
        }
        this.getTopicMotivation = function() {
            return _reportTopicMotivation;
        }
        this.setTopicMotivation = function(motivation) {
            _reportTopicMotivation = motivation;
        }
        this.getReporterLabel = function() {
            return _reporterLabel;
        }
        this.setReporterLabel = function(reportLabel) {
            _reporterLabel = reportLabel;
        }
        this.getReporter = function() {
            return _reporter;
        }
        this.setReporter = function(reporter) {
            _reporter = reporter;
        }

    }
}
module.exports = PlainOPRContextContentData;