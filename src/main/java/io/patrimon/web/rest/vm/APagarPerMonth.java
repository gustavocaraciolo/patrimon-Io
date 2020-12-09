package io.patrimon.web.rest.vm;

import io.patrimon.domain.APagar;
import java.time.YearMonth;
import java.util.List;

public class APagarPerMonth {
    private YearMonth month;
    private List<APagar> aPagars;

    public APagarPerMonth(YearMonth yearWithMonth, List<APagar> aPagars) {
        this.month = yearWithMonth;
        this.aPagars = aPagars;
    }

    public YearMonth getMonth() {
        return month;
    }

    public void setMonth(YearMonth month) {
        this.month = month;
    }

    public List<APagar> getaPagars() {
        return aPagars;
    }

    public void setaPagars(List<APagar> aPagars) {
        this.aPagars = aPagars;
    }

    @Override
    public String toString() {
        return "PointsPerMonth{" + "month=" + month + ", aPagars=" + aPagars + '}';
    }
}
