var fs = require("fs");
var Handlebars = require("handlebars");

function render(resume) {
	if (resume.basics && resume.basics.profiles.length > 0) {
		for (var i=0; i < resume.basics.profiles.length; i++) {
			resume.basics.profiles[i].class = resume.basics.profiles[i].network.toLowerCase();
		}
	}
	if (resume.work && resume.work.length > 0) {
		for(var i=0; i<resume.work.length; i++) {
			w = resume.work[i];
			w.startDateYear = w.startDate.substr(0,4);
			if(w.endDate) {
				w.endDateYear = w.endDate.substr(0,4);
			} else {
				w.endDateYear = 'Present'
			}
		}
	}
	if (resume.volunteer && resume.volunteer.length > 0) {
		for(var i=0; i<resume.volunteer.length; i++) {
			w = resume.volunteer[i];
			w.startDateYear = w.startDate.substr(0,4);
			if(w.endDate) {
				w.endDateYear = w.endDate.substr(0,4);
			} else {
				w.endDateYear = 'Present'
			}
		}

	}
	if (resume.education && resume.education.length > 0) {
		for(var i=0; i<resume.education.length; i++) {
			e = resume.education[i];
			if( !e.area || !e.studyType ){
				e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
			}  else {
				e.educationDetail = e.area + " ("+ e.studyType + ")";
			}
			e.startDateYear = e.startDate.substr(0,4);
			if(e.endDate) {
				e.endDateYear = e.endDate.substr(0,4);
			}  else {
				e.endDateYear = 'Present'
			}
		}
	}

	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");
	return Handlebars.compile(template)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};