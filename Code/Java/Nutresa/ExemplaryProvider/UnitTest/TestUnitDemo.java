package Nutresa.ExemplaryProvider.UnitTest;

import org.junit.Test;
import static org.junit.Assert.*;

public class TestUnitDemo {
    @Test
    public void testConcatenate() {
        TestDemo myUnit = new TestDemo();
        int result = myUnit.sum(3,4);
        assertEquals(5, result);
    }
}
