var MathApp = window.MathApp || {};
MathApp.settings = {
	version:'0.0.0',
	dateFormat:kendo.culture().calendar.patterns.d,
	timeFormat:kendo.culture().calendar.patterns.t,
	config: {
		user:{
			accounts: []
		},
		global:{}
	},
	moment_dateFormat : "YYYY-MM-DD", 
	moment_timeFormat : "HH:mm",
	moment_dateFormat_output:"ddd, Do MMMM YYYY",
	moment_dateFormat_output_short:"MM-DD",
	moment_dateFormat_output_shorter:"M-D",
	ajaxParams: {
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json"
	}
}