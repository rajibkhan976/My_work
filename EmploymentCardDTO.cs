using System;
using Bluegarden.HRPlus.Common.Attributes;
// ReSharper disable StringLiteralTypo

namespace Bluegarden.HRPlus.ServiceLayer.DTO
{
    [FieldsConfigurableDto("EmploymentCardDTO_Title", "Employment cards", OnlyVisibleOrHidden = true)]
    public class EmploymentCardDTO : BaseEmployeeListDTO
    {
        [ResourceKey("EmploymentCardDTO_PersonId", "Person id")]
        public int PersonId { get; set; }

        [ResourceKey("EmploymentCardDTO_SocialSecurityNumber", "Social securitynumber")]
        public string SocialSecurityNumber { get; set; }

        [ResourceKey("EmploymentCardDTO_PassportNumber", "Passport number")]
        public string PassportNumber { get; set; }

        [ResourceKey("EmploymentCardDTO_EmploymentGroups", "Employment groups", "Rapporteringsställen")]
        public string EmploymentGroups { get; set; }

        [ResourceKey("EmploymentCardDTO_Department", "Department")]
        public string Department { get; set; }

        [ResourceKey("EmploymentCardDTO_Administration", "Administration")]
        public string Administration { get; set; }

        [ResourceKey("EmploymentCardDTO_Image", "Image")]
        public byte[] Image { get; set; }

        [ResourceKey("EmploymentCardDTO_Email", "Email")]
        public string Email { get; set; }

        [ResourceKey("EmploymentCardDTO_Phone", "Phone")]
        public string Phone { get; set; }

        [ResourceKey("EmploymentCardDTO_Fullname", "Fullname")]
        public string Fullname { get; set; }

        [ResourceKey("EmploymentCardDTO_AccountPart1", "AccountPart1")]
        public string AccountPart1 { get; set; }

    }
}