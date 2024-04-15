$(document).ready(function () {
    $('#taxForm').submit(function (e) {
        e.preventDefault();
        $('.error-icon').hide();
        var age = $('#age').val();
        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val());
        var deductions = parseFloat($('#deductions').val());

        // Check for empty fields
        if (age === "" || isNaN(income) || isNaN(extraIncome) || isNaN(deductions)) {
            $('#ageError').show();
            $('#incomeError').show();
            $('#extraIncomeError').show();
            $('#deductionsError').show();
            return;
        }

        // Perform tax calculation
        var tax = 0;
        var taxableIncome = income + extraIncome - deductions;
        if (taxableIncome > 800000) {
            if (age === "<40") {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (age === ">=40&<60") {
                tax = 0.4 * (taxableIncome - 800000);
            } else if (age === ">=60") {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }

        // Display result in modal
        $('#resultBody').html(`<p>Your taxable income is ₹${taxableIncome.toLocaleString()} and your tax is ₹${tax.toLocaleString()}</p>`);
        $('#resultModal').modal('show');
    });
});
