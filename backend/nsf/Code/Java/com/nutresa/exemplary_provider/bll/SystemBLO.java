package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SystemDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SystemDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SystemBLO extends GenericBLO<SystemDTO, SystemDAO> {

    public SystemBLO() {
        super(SystemDAO.class);
    }

    @Override
    public SystemDTO save(SystemDTO system) throws HandlerGenericException {
        try {
            SystemDAO systemDAO = new SystemDAO();
            SystemDTO configurationExisting = systemDAO.getConfiguration();
            configurationExisting.setRotationTime(system.getRotationTime());
            configurationExisting.setTitle(system.getTitle());
            configurationExisting.setContent(system.getContent());
            configurationExisting.setImages(system.getImages());
            configurationExisting.setInformationProgram(system.getInformationProgram());
            configurationExisting.setDataPolicy(system.getDataPolicy());
            configurationExisting.setMessageByChangeSizeCompany(system.getMessageByChangeSizeCompany());
            configurationExisting.setInputPoll(system.getInputPoll());
            return systemDAO.saveProfile(configurationExisting);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public SystemDTO getConfiguration() throws HandlerGenericException {
        SystemDAO systemDAO = new SystemDAO();
        SystemDTO system = systemDAO.getConfiguration();
        if (!(system instanceof SystemDTO)) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        AttachmentBLO attachmentBLO = new AttachmentBLO();
        system.setDocument(attachmentBLO.getDocuments(system.getImages()));

        return system;

    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("title");
        fields.add("content");
        fields.add("informationProgram");
        fields.add("messageByChangeSizeCompany");
        fields.add("inputPoll");
        fields.add("dataPolicy");
        entityWithFields.put("System", fields);
        return entityWithFields;
    }

}