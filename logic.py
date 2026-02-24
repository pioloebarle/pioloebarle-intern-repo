def calculateProgress(completed, total):
    if not isinstance(completed, (int, float)) or not isinstance(total, (int, float)):
        raise ValueError("Inputs must be numbers.")
    if total <= 0:
        return 0
    return min((completed / total) * 100, 100)