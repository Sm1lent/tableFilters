


document.addEventListener('DOMContentLoaded', function() {
    //let studentsList = [];
    //чтобы проще было тестировать - вот начальный массив ;)
    let studentsList = [
        {surname: 'Сбитнев', name: 'Максим', secondName: 'Ильич', birth: new Date('11.06.1995'), studyingStartYear: 2018, faculty: 'Физико-химический'},
        {surname: 'Покорская', name: 'Ирина', secondName: 'Сергеевна', birth: new Date('01.31.1987'), studyingStartYear: 2019, faculty: 'Географический'},
        {surname: 'Иванов', name: 'Павел', secondName: 'Павлович', birth: new Date('10.10.1999'), studyingStartYear: 2020, faculty: 'Иностранных Языков'},
        {surname: 'Артамкин', name: 'Владимир', secondName: 'Алексеевич', birth: new Date('05.03.1990'), studyingStartYear: 2018, faculty: 'Механико-математический'},
        {surname: 'Шапиро', name: 'Евгений', secondName: 'Соломонович', birth: new Date('03.28.1993'), studyingStartYear: 2015, faculty: 'Физико-химический'},
        {surname: 'Сокорева', name: 'Людмила', secondName: 'Витальевна', birth: new Date('11.31.2000'), studyingStartYear: 2019, faculty: 'Экономический'},
        {surname: 'Прошкин ', name: 'Дмитрий', secondName: 'Борисович', birth: new Date('08.10.1941'), studyingStartYear: 2015, faculty: 'Иностранных Языков'},
        {surname: 'Русинова', name: 'Ольга', secondName: 'Юрьевна', birth: new Date('07.03.1970'), studyingStartYear: 2001, faculty: 'Механико-математический'},
        {surname: 'Дикун', name: 'Любовь', secondName: 'Андреевна', birth: new Date('1980.01.26'), studyingStartYear: 2008, faculty: 'Физико-химический'}
    ];
    const table =  document.querySelector('.table');
    const resetFiltersBtn = document.querySelector('.reset_filter_btn');
    const nameSorter = document.querySelector('.FIO_heading');
    const facultySorter = document.querySelector('.faculty_heading');
    const ageSorter = document.querySelector('.birth_heading');
    const educationYearsSorter = document.querySelector('.education_years_heading');
    const addStudentBtn = document.querySelector('.add_btn');
    const newStudentStringInputs = document.querySelectorAll('.text_input');
    const surnameErrorMessage = document.querySelector('.wrong_surname_message');
    const emptySurnameErrorMessage = document.querySelector('.fill_surname_message');
    const nameErrorMessage = document.querySelector('.wrong_name_message');
    const emptyNameErrorMessage = document.querySelector('.fill_name_message');
    const secondnameErrorMessage = document.querySelector('.wrong_secondname_message');
    const emptySecondnameErrorMessage = document.querySelector('.fill_secondname_message');
    const birthDateErrorMessage = document.querySelector('.wrong_birth_message');
    const ageErrorMessage = document.querySelector('.wrong_year_message')
    const emptyBirthErrorMessage = document.querySelector('.fill_birth_message');
    const studyingStartDateErrorMessage = document.querySelector('.wrong_studying_message');
    const emptyStudyingYearsErrorMessage = document.querySelector('.fill_studying_message');
    const shortSurnameErrorMessage = document.querySelector('.short_surname_message');
    const shortNameErrorMessage = document.querySelector('.short_name_message');
    const shortSecondNameErrorMessage = document.querySelector('.short_secondname_message');

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    displayStudents();
    correctEnteredName();  
    addStudentToStudentsList();

    nameSorter.addEventListener('click', function(){
        sortStudentsByName();
    });
    facultySorter.addEventListener('click', function(){
        sortStudentsByFaculty();
    });
    ageSorter.addEventListener('click', function(){
        sortStudentsByAge();
    });
    educationYearsSorter.addEventListener('click', function(){
        sortStudentsByEducationStartedYear();
    });
    document.querySelectorAll('.filter .input').forEach(function(listener){
        listener.addEventListener('input', function(){
            clearTimeout(print);
            print = setTimeout(function() {
                let activeSorter  = document.querySelector('.active_sorter');
                if (activeSorter){
                    sortStudents();
                }
                else{
                    clearTable();
                    displayStudents();
                }
            }, 400);  
        });
    }) 
    resetFiltersBtn.addEventListener('click',(reset) =>{
        reset.preventDefault();
        clearTable();
        resetFilters();
    });

    function resetFilters(){
        document.querySelector('.name_filter').value = '';
        document.querySelector('.faculty_filter').value ='';
        document.querySelector('.studying_start_filter').value ='';
        document.querySelector('.graduated_filter').value ='';
        displayStudents();
    }

    function  sortStudentsByName(){
        clearTable();
        let activeSorter  = document.querySelector('.active_sorter');
        if(activeSorter) {
            activeSorter.classList.remove('active_sorter');
        }
        nameSorter.classList.add('active_sorter');
        if (studentsList.length  > 0) {
            let sortedList = [];
            for (let student of studentsList){
                if(applyTableFilter(student)){
                    sortedList.push(student);
                };
            }
            if (sortedList.length === 1){
                displayStudentInTable(sortedList[0]);
            }
            if (sortedList.length > 1){
                sortedList.sort(function (a, b) {
                    if ((a.surname + a.name + a.secondName) > (b.surname + b.name + b.secondName)) {
                        return 1;
                    }
                    if ((a.surname + a.name + a.secondName) < (b.surname + b.name + b.secondName)) {
                        return -1;
                    }
                    return 0;
                });
                for (let student of sortedList){
                    displayStudentInTable(student);
                }
            }
        }
    }

    function sortStudentsByFaculty (){
        clearTable();
        let activeSorter  = document.querySelector('.active_sorter');
        if(activeSorter) {
            activeSorter.classList.remove('active_sorter');
        }
        let sortedList = [];
        facultySorter.classList.add('active_sorter');
        if (studentsList.length  > 0) {
            for (let student of studentsList){
                if(applyTableFilter(student)){
                    sortedList.push(student);
                };
            }
            if (sortedList.length === 1){
                displayStudentInTable(sortedList[0]);
            }
            if (sortedList.length > 1){
                sortedList.sort(function (a, b) {
                    if (a.faculty > b.faculty) {
                        return 1;
                    }
                    if (a.faculty < b.faculty) {
                        return -1;
                    }
                    return 0;
                });
                for (student of sortedList){
                    displayStudentInTable(student);
                }
            }
        }
    }

    function sortStudentsByAge(){
        clearTable();
        let activeSorter  = document.querySelector('.active_sorter');
        if(activeSorter) {
            activeSorter.classList.remove('active_sorter');
        }
        ageSorter.classList.add('active_sorter');
        if (studentsList.length  > 0) {
            let sortedList = [];
            for (student of studentsList){
                if(applyTableFilter(student)){
                    sortedList.push(student);
                };
            }
            if (sortedList.length === 1){
                displayStudentInTable(sortedList[0]);
            }
            if (sortedList.length > 1){
                sortedList.sort(function (a, b) {
                    if (a.birth > b.birth) {
                        return 1;
                    }
                    if (a.birth < b.birth) {
                        return -1;
                    }
                    return 0;
                });
                for (student of sortedList){
                    displayStudentInTable(student);
                }
            }
        }
    }

    function sortStudentsByEducationStartedYear(){
        clearTable();
        let activeSorter  = document.querySelector('.active_sorter');
        if(activeSorter) {
            activeSorter.classList.remove('active_sorter');
        }
        educationYearsSorter.classList.add('active_sorter');
        if (studentsList.length  > 0) {
            let sortedList = [];
            for (student of studentsList){
                if(applyTableFilter(student)){
                    sortedList.push(student);
                };
            }
            if (sortedList.length === 1){
                displayStudentInTable(sortedList[0]);
            }
            if (sortedList.length > 1){
                sortedList.sort(function (a, b) {
                    if (a.studyingStartYear > b.studyingStartYear) {
                        return 1;
                    }
                    if (a.studyingStartYear < b.studyingStartYear) {
                        return -1;
                    }
                    return 0;
                });
                for (student of sortedList){
                    displayStudentInTable(student);
                }
            }
        }
    }

    function sortStudents(){
        let activeSorter  = document.querySelector('.active_sorter');
        if (activeSorter){
            if (activeSorter.classList.contains('FIO_heading')){
                sortStudentsByName();
            }
            else if (activeSorter.classList.contains('faculty_heading')){
                sortStudentsByFaculty();
            }
            else if (activeSorter.classList.contains('birth_heading')){
                sortStudentsByAge();
            }
            else if (activeSorter.classList.contains('education_years_heading')){
                sortStudentsByEducationStartedYear();
            }
        }
    }

    function applyTableFilter(student) {
        let filteredName =  applyNameFilter(student);
        let filteredFaculty = applyFacultyFilter(student);
        let filteredStartYear = applyStartYearFilter(student);
        let filteredGraduatedYear = applyGraduatedYearFilter(student);
        if (!filteredName || !filteredFaculty || !filteredStartYear || !filteredGraduatedYear) {
            return false; 
        }        
        return true;
    }

    function applyNameFilter(student){
        let filterForName = document.querySelector('.name_filter').value.trim();
        if (filterForName === ''){
            return true;
        }
        else {
            filterForName = filterForName.toLowerCase();
            let nameToFilter = student.name.toLowerCase().includes(filterForName);
            let secondNameToFilter = student.secondName.toLowerCase().includes(filterForName);
            let surnameToFilter = student.surname.toLowerCase().includes(filterForName);
            if (nameToFilter || secondNameToFilter || surnameToFilter) {
                return true;;
            }
            return false;
        }
    }

    function applyFacultyFilter (student) {
        let filterForFaculty = document.querySelector('.faculty_filter').value.trim();
        if (filterForFaculty === ''){
            return true;
        }
        filterForFaculty = filterForFaculty.toLowerCase();
        let facultyToFilter = student.faculty.toLowerCase().includes(filterForFaculty);
        if (facultyToFilter) {
            return true;
        }
        return false;        
    }

    function applyStartYearFilter(student){
        let filterForStartYear = document.querySelector('.studying_start_filter').value;
        if (filterForStartYear === ''){
            return true;
        }
        if (Number(student.studyingStartYear) === Number(filterForStartYear)){
            return true;
        }
        return false; 
    }

    function applyGraduatedYearFilter(student){
        let filterForGraduatedYear = document.querySelector('.graduated_filter').value;
        if (filterForGraduatedYear === ''){
            return true;
        }
        if ((Number(student.studyingStartYear) + 4) === Number(filterForGraduatedYear)){
            return true;
        }
        return false;
    }
    
    function displayStudents() {
        for (student of studentsList){
           let approvedStudent =  applyTableFilter(student);
           if (approvedStudent){
            displayStudentInTable(student);
           }
        }
    }
    
    function correctEnteredName () {      
        newStudentStringInputs.forEach(function(input) {
            input.addEventListener("blur", function() {
                let enteredName = input.value;
                if (enteredName !== ''){
                    let trimmedName = enteredName.trim();
                    let correctName = trimmedName.substring(0,1).toUpperCase() +  trimmedName.substring(1).toLowerCase();
                    input.value = correctName;
                }
            });
        });
    }

    function addStudentToStudentsList () {
        addStudentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const studentSurname = document.querySelector('.surname_input').value;
            const studentName = document.querySelector('.name_input').value;
            const studentSecondName = document.querySelector('.second_name_input').value;
            const studentBirthDate = document.querySelector('.birth_input').valueAsDate;
            const studentStudyingStartDate = document.querySelector('.studying_start_input').value;
            const studentFaculty = document.querySelector('.faculty_select').value;
            removeErrorMessages();
            if (checkEnteredDataValidity(studentSurname, studentName, studentSecondName, studentBirthDate, studentStudyingStartDate, studentFaculty)) {
                let newStudent = {surname: studentSurname, name: studentName, secondName: studentSecondName, birth: studentBirthDate, studyingStartYear: studentStudyingStartDate, faculty: studentFaculty};
                studentsList.push(newStudent);
                console.log(studentsList);
                let activeSorter  = document.querySelector('.active_sorter');
                if (activeSorter) {
                    sortStudents();
                }
                else {    
                    displayStudentInTable(newStudent);
                }
                clearInputFields();
            }
        });
    }

    function checkEnteredDataValidity(studentSurname, studentName, studentSecondName, studentBirthDate, studentStudyingStartDate) {
        let checkedEnteredSurname =  checkEnteredNameValidity(studentSurname, surnameErrorMessage);
        let checkedEnteredName = checkEnteredNameValidity(studentName, nameErrorMessage);
        let checkedEnteredSecondame = checkEnteredNameValidity(studentSecondName, secondnameErrorMessage);
        let checkedEnteredBirthDate = checkEnteredBirthDateValidity(studentBirthDate, studentStudyingStartDate);
        let checkedEnteredStudyingDate = checkEnteredStudyingDateValidity(studentStudyingStartDate);
        if (checkedEnteredSurname && checkedEnteredName &&  checkedEnteredSecondame && checkedEnteredBirthDate && checkedEnteredStudyingDate) {
            return true;
        }
        else {
            return false;
        }
    }

    function checkEnteredNameValidity(enteredName, targetNode) {
        if (enteredName.trim() === ''){
            switch (targetNode){
                case surnameErrorMessage:
                showErrorMessage (emptySurnameErrorMessage);
                return false;
                case nameErrorMessage:
                showErrorMessage (emptyNameErrorMessage);
                return false;
                case secondnameErrorMessage:
                showErrorMessage (emptySecondnameErrorMessage);
                return false;
            }
        }
        if (enteredName.trim().length < 2){
            switch (targetNode){
            case surnameErrorMessage:
            showErrorMessage (shortSurnameErrorMessage);
            return false;
            case nameErrorMessage:
            showErrorMessage (shortNameErrorMessage);
            return false;
            case secondnameErrorMessage:
            showErrorMessage (shortSecondNameErrorMessage);
            return false;
        }
        }
        let validLetters = /^[А-Яа-я]+$/;
        if (enteredName.match(validLetters)) {
            return true;
        }
        else {
            showErrorMessage (targetNode);
            return false;
        }
    }
    
    function checkEnteredBirthDateValidity(birthDate, studentStudyingStartDate) {
        if (birthDate === null){
            showErrorMessage (emptyBirthErrorMessage);
            return false;
        }
        let checkingYear = birthDate.getFullYear();
        if ((checkingYear < 1900)||(birthDate > today)){
            showErrorMessage (birthDateErrorMessage);
            return false;
        }
        if ((checkingYear + 9) > studentStudyingStartDate){
            showErrorMessage (ageErrorMessage);
        return false;
        }
        return true;
    }

    function checkEnteredStudyingDateValidity(startDate){
        if (startDate === ''){
            showErrorMessage (emptyStudyingYearsErrorMessage);
            return false;
        }
        if ((startDate < 2000)||(startDate > currentYear)){
            showErrorMessage (studyingStartDateErrorMessage);
            return false;
        }
        return true;
    }

    function showErrorMessage (targetNode) {
        targetNode.classList.remove('display_none');
        let input = targetNode.parentNode.querySelector('.input');
        let listener = function (event) {
            targetNode.classList.add('display_none');
            input.removeEventListener('input', listener);
        }
        input.addEventListener('input', listener);
    }

    function displayStudentInTable (student){
        let row = document.createElement('tr');
        row.classList.add('student_data');
        let FIOCell = document.createElement('td');
        FIOCell.textContent =  student.surname + '\u00A0' + student.name + '\u00A0' + student.secondName;
        row.append(FIOCell);
        let fatultyCell= document.createElement('td');
        fatultyCell.textContent = student.faculty;
        row.append(fatultyCell);
        let ageCell = document.createElement('td');
        let age =  today.getFullYear() - student.birth.getFullYear();
        let ageText = student.birth.toLocaleDateString() + ' ' + '\u0028'+ age + ' лет' + '\u0029';
        ageCell.textContent = ageText;
        row.append(ageCell);
        let educationIntervalCell = document.createElement('td');
        let educationStart = student.studyingStartYear;
        let educationEnd = Number(educationStart) + 4;
        let currentCourse =  today.getFullYear() - educationStart;
        let educationIntervalContent;
        if (currentMonth > 7) {
          currentCourse++;
        }
        if (currentCourse > 4) {
          currentCourse = false;
        }
        if (currentCourse) {
          educationIntervalContent = educationStart.toString() + ' - ' + educationEnd.toString() +  ' \u0028'+ currentCourse + ' курс' + '\u0029';
        }
        else {
          educationIntervalContent = educationStart.toString() + ' - ' + educationEnd.toString() +  ' (окончил(а))';
        }
        educationIntervalCell.textContent = educationIntervalContent;
        row.append(educationIntervalCell);
        table.append(row);
    };

    function clearInputFields() {
        document.querySelector('.surname_input').value = '';
        document.querySelector('.name_input').value = '';
        document.querySelector('.second_name_input').value = '';
        document.querySelector('.birth_input').value = '';
        document.querySelector('.studying_start_input').value = '';
    }

    function clearTable() {
        let activeRowsQuantity = document.querySelectorAll('.student_data').length ;
        while(activeRowsQuantity > 0) {
            let tableStudentRow = document.querySelector('.student_data');
            table.removeChild(tableStudentRow);
            activeRowsQuantity--;
        }
    }
    function removeErrorMessages(){
        document.querySelectorAll('.input__error_message').forEach(function(isHidden){
           if (!isHidden.classList.contains('display_none')) {
            isHidden.classList.add('display_none');
           } 
        });
    }
});