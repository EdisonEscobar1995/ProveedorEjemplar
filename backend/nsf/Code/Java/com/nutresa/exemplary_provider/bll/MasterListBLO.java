package com.nutresa.exemplary_provider.bll;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.nutresa.exemplary_provider.dal.CountryDAO;
import com.nutresa.exemplary_provider.dtl.CountryDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class MasterListBLO extends GenericBLO<CountryDTO, CountryDAO> {

    public MasterListBLO() {
        super(CountryDAO.class);
    }

    public Map<String, List<DTO>> get(Map<String, String> parameters) throws HandlerGenericException {
        String[] mastersToLoad = new String[parameters.size()];

        int i = 0;

        List<String> allowedEntities = Common.arrayToList(new String[] { "Call", "Country", "City", "Department",
                "CompanySize", "CompanyType", "Sector", "Category", "Subcategory", "Supply", "System", "Dimension",
                "Criterion", "SocietyType", "Supplier", "User", "Rol", "Service", "Item", "Access" });

        for (Entry<String, String> parameter : parameters.entrySet()) {
            String master = parameter.getKey();
            if (allowedEntities.contains(master)) {
                mastersToLoad[i++] = master;
            }
        }
        return getMasters(mastersToLoad);
    }

}
