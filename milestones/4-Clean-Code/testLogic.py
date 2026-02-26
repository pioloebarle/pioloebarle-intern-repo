import pytest
from logic import calculateProgress

def testStandardCalculation():
    assert calculateProgress(5, 10) == 50.0

def testDivisionByZeroEdgeCase():
    assert calculateProgress(5, 0) == 0

def testInvalidInputType():
    with pytest.raises(ValueError, match="Inputs must be numbers"):
        calculateProgress("5", 10)

def testCapAtOneHundred():
    assert calculateProgress(15, 10) == 100