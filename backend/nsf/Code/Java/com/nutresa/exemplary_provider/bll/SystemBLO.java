package com.nutresa.exemplary_provider.bll;

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

}